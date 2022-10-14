/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Drawer,
	Button,
} from "@material-ui/core";
// import { getCategory, getSubCategory, getVerticalCategory } from "../AppApi";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoDataFound from "../Component/NoDataFound";
import { Route } from 'react-router-dom'
import "../AppAsset/CSS/Product.css";
import { getCategory, getState } from "../AppApi";
import ProductCard from "./ProductCard";
import ShareIcon from '@material-ui/icons/Share';
import Modal from '@material-ui/core/Modal';
import {
	FacebookShareButton,
	PinterestShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	PinterestIcon,
	InstapaperIcon,
	InstapaperShareButton,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
	LinkedinShareButton,
	EmailShareButton,
	LinkedinIcon,
	EmailIcon,
} from "react-share";
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	getSubCategory,
	getProducts,
	getDistrict,
	getVerticalCategory,
} from "../AppApi";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
let body = '';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 15,
			load: true,
			categorydata: [],
			subCategoryData: [],
			verticalData: [],
			data: [],
			drawer: false,
			stateData: [],
			offset: 0,
			data: 0,
			perPage: 20,
			currentPage: 0,
			loader: '',
			productData: [],
			dataList: [],
			open: false,
			openProduct: true,
			openProductList: false,
			openProductScroll: false,
			sort: null,
			price: null,
			sortOrder: null,
			verticleCategories: null,
			subCategories: null,
			state: null,
			district: null,
			verticalCategoryList: [],
			districtList: [],
			routPath: false,
		};
		this.handlePageClick = this.handlePageClick.bind(this);

	}
	onClickGenerateShareLink = () => {
		let tempUrl = "https://" + window.location.hostname + "/all-product/";
		if (this.props.categoryValue !== null) {
			tempUrl = `${tempUrl}categoryId=${this.props.categoryValue}&`;
		}
		if (this.props.subCategoriesValue !== null) {
			tempUrl = `${tempUrl}subCategoryId=${this.props.subCategoriesValue}&`;
		}
		if (this.props.verticleCategoriesValue !== null) {
			tempUrl = `${tempUrl}vertical=${this.props.verticleCategoriesValue}&`;
		}
		if (this.props.sortValue !== null) {
			tempUrl = `${tempUrl}sortBy=${this.props.sortValue}&`;
		}
		if (this.props.sortOrderValue !== null) {
			tempUrl = `${tempUrl}sortOrder=${this.props.sortOrderValue}&`;
		}
		return tempUrl;
	};

	onFilterSubmit = async () => {
		// this.setState({ drawer: false, load: true, productData: [] });

		const params = {
			category_id: this.props.categoryValue,
			subcategory_id: Number(this.props.subCategoriesValue),
			vertical_id: this.props.verticleCategoriesValue,
			sortBy: String(this.props.sortValue),
			sortOrder: this.props.sortOrderValue,
			// state: this.state.state,
			// district: this.state.district,
			page: 1,
		};

		this.setState({ params });
		const res = await getProducts(params);
		this.setState({
			load: false,
			productData: res.data && res.data.data ? res.data.data : {},
		});

		if (this.state.productData && this.state.productData.data) {
			if (this.state.productData.data.length <= 0) { this.setState({ openProductList: true }) }
		}
		if (this.state.productData && this.state.productData.data && this.state.productData.data.length) {
			this.setState({ dataList: [], openProductScroll: true, openProductList: false })
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
		}
		this.receivedData();
		this.setState({ drawer: false })
		this.props.onFilterSubmit(false)

		this.setState({ routPath: true })
	};
	onFilterChangeHandle = async (e) => {
		const name = e.target.name;

		this.setState({
			...this.state,
			[name]: e.target.value,
		});
		typeof value === 'string' ? e.target.value.split(',') : e.target.valuevalue;
		if (e.target.name === "category") {
			const tempSubCategoryList = await getSubCategory(e.target.value);
			this.setState({ subCategoryList: tempSubCategoryList.data.data });
		}

		if (e.target.name === "subCategories") {
			let data = e.target.value;
			for (let i = 0; i <= data.length; i++) {
				const tempVerticalData = await getVerticalCategory(data[i]);
				let second = [];
				second = tempVerticalData.data;
				this.setState({
					verticalDataItem: tempVerticalData.data && tempVerticalData.data
				})

				if (second.message === 'Verticals') {
					let list = [...this.state.verticalCategoryList, ...this.state.verticalDataItem.data]
					this.setState({ verticalCategoryList: list })

				}

			}
		}

		if (e.target.name === "state") {
			const tempDistrictData = await getDistrict(e.target.value);
			this.setState({ districtList: tempDistrictData });
		}

	};

	componentDidMount = async () => {
		window.scrollTo(0, 0)
		const categoryTempData = await getCategory();
		const tempState = await getState();
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);
		const params = {
			category_id: id,
			page: 1,
		};
		const prod = await getProducts(params)


		this.setState({
			categorydata:
				categoryTempData &&
					categoryTempData.data &&
					categoryTempData.data.data &&
					categoryTempData.data.data &&
					categoryTempData.data.data.length > 0
					? categoryTempData.data.data
					: [],
			stateData: (tempState && tempState) || [],
			productData: (prod.data && prod.data.data) || prod.data.data || {},

		});
		if (this.state.productData && this.state.productData.data && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
		}
		this.props.onDrawerClick(false)
		this.receivedData();

	};

	receivedData() {
		const list = this.props.dataList && this.props.dataList.length ? this.props.dataList : this.state.dataList;
		const data = this.props.productData;
		list && list.length ? this.setState({
			pageCount: data.last_page,
			prodData: list.map((dat) => <ProductCard data={dat} />)
		}) : this.setState({
			pageCount: data.last_page,
			prodData: data?.data?.map((pd) => <ProductCard data={pd} />),

		})


	}


	handleOpen = () => {
		this.setState({ open: true })
	};

	handleClose = () => {
		this.setState({ open: false })

	};
	handlePageClick = async (e) => {
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);

		const params = {
			category_id: id,
			page: this.state.productData.current_page + 1,
		};
		const prod = await getProducts(params);
		this.setState({
			productData: (prod.data && prod.data.data) || prod.data.data || {},

		});

		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
			this.receivedData();
		}
		if (this.props.type === 'all' && this.state.productData.current_page !== this.state.productData.last_page) {
			let verticalIdTemp = null;
			const vertical = "vertical=";
			const tempString = window.location.href.slice(
				window.location.href.lastIndexOf("/") + 1
			);
			if (tempString.indexOf(vertical) !== -1) {
				verticalIdTemp = tempString.slice(
					tempString.indexOf(vertical) + vertical.length,
					tempString.indexOf("&", tempString.indexOf(vertical) + vertical.length)
				);

			}
			const params = {
				vertical_id: verticalIdTemp,
				page: this.state.productData.current_page + 1,
			};
			const prod = await getProducts(params);
			this.setState({
				load: false,
				productData: (prod.data && prod.data.data) || prod.data.data || {},
			});
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
		}
	}
	handlePageClickFilter = async (e) => {
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);

		const params = {
			category_id: this.props.categoryValue,
			subcategory_id: Number(this.props.subCategoriesValue),
			vertical_id: this.props.verticleCategoriesValue,
			sortBy: String(this.props.sortValue),
			sortOrder: this.props.sortOrderValue,
			// state: this.state.state,
			// district: this.state.district,
			page: this.state.productData.current_page + 1,
		};
		const prod = await getProducts(params);
		this.setState({
			productData: (prod.data && prod.data.data) || prod.data.data || {},

		});

		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
			this.receivedData();
		}
		if (this.props.type === 'all' && this.state.productData.current_page !== this.state.productData.last_page) {
			let verticalIdTemp = null;
			const vertical = "vertical=";
			const tempString = window.location.href.slice(
				window.location.href.lastIndexOf("/") + 1
			);
			if (tempString.indexOf(vertical) !== -1) {
				verticalIdTemp = tempString.slice(
					tempString.indexOf(vertical) + vertical.length,
					tempString.indexOf("&", tempString.indexOf(vertical) + vertical.length)
				);

			}
			const params = {
				vertical_id: verticalIdTemp,
				page: this.state.productData.current_page + 1,
			};
			const prod = await getProducts(params);
			this.setState({
				load: false,
				productData: (prod.data && prod.data.data) || prod.data.data || {},
			});
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
		}
	}
	handlePageChange(pageNumber) {
		this.setState({ activePage: pageNumber });
	}

	onDrawerClick = (p) => {
		this.setState({ drawer: p });
	};
	handleScroll = (e) => {
		let botton = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 50;
		if (botton) {
			this.handlePageClick()
		}

	}


	render() {
		return (
			<div className="productContainer">

				<div className="productContainerHeading" >Products</div>
				{this.props && !this.props.showFilter ? (
					<div style={{ marginBottom: "5px", marginTop: "5px" }}>
						{this.state.openProductScroll && <Button
							onClick={this.handleOpen}
							style={{ float: "right", color: "orange", fontWeight: "700" }}
						>
							<FilterListIcon />
							Share Result
						</Button>}

						<Button
							onClick={() => this.props.onDrawerClick(true)}
							style={{ float: "right", color: "orange", fontWeight: "700" }}
						>
							<FilterListIcon />
							Sort & Filters
						</Button>
						<>
							<Drawer
								anchor="bottom"
								open={this.state.open}
								onClose={this.handleClose}
							>
								<div
									style={{
										width: "100%",
										height: "150px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										padding: "5px",
									}}
								>
									<div className="ProductDetailShareButton">
										<WhatsappShareButton url={this.onClickGenerateShareLink()}>
											<WhatsappIcon />
										</WhatsappShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<FacebookShareButton url={this.onClickGenerateShareLink()}>
											<FacebookIcon />
										</FacebookShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<TelegramShareButton url={this.onClickGenerateShareLink()}>
											<TelegramIcon />
										</TelegramShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<TwitterShareButton url={this.onClickGenerateShareLink()}>
											<TwitterIcon />
										</TwitterShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<PinterestShareButton url={this.onClickGenerateShareLink()}>
											<PinterestIcon />
										</PinterestShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<LinkedinShareButton url={this.onClickGenerateShareLink()}>
											<LinkedinIcon />
										</LinkedinShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<EmailShareButton url={this.onClickGenerateShareLink()}>
											<EmailIcon />
										</EmailShareButton>
									</div>
									<div className="ProductDetailShareButton">
										<InstapaperShareButton
											url={this.onClickGenerateShareLink()}
										>
											<InstapaperIcon />
										</InstapaperShareButton>
									</div>
								</div>
							</Drawer>
						</>
					</div>
				) : null}
				<div>
					<Drawer
						anchor="bottom"
						open={this.props.drawer}
						onClose={() => this.props.onDrawerClick(false)}
					>
						<div className="productFliters">
							{this.props.showCategoryFilter ? (
								<div className="filters">
									<FormControl fullWidth>
										<InputLabel>Categories</InputLabel>
										<Select
											name="category"
											value={this.props.categoryValue}
											onChange={(e) => this.props.onFilterChangeHandle(e)}
										>
											{this.state.categorydata &&
												this.state.categorydata.length > 0
												? this.state.categorydata.map((res) => {
													return (
														<MenuItem key={res.id} value={res.id}>
															{res.name}
														</MenuItem>
													);
												})
												: null}
										</Select>
									</FormControl>
								</div>
							) : null}
							{this.props.showSubCategoryFilter && this.props.categoryValue ? (
								<div className="filters">
									<FormControl fullWidth>
										<InputLabel className='mdc-floating-label' shrink={true}>Sub Categories</InputLabel>
										<Select
											name="subCategories"
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											multiple
											value={this.props.subCategoriesValue}
											MenuProps={MenuProps}
											onChange={(e) => this.props.onFilterChangeHandle(e)}
										>

											{this.props.subCategoryList &&
												this.props.subCategoryList.length > 0
												? this.props.subCategoryList.map((res) => {
													return (
														<MenuItem key={res.id} value={res.id}>
															{res.name}
														</MenuItem>
													);
												})
												: null}
										</Select>
									</FormControl>
								</div>
							) : null}
							{
								this.props.subCategoriesValue ? (
									<div className="filters">
										<FormControl fullWidth>
											<InputLabel>Vertical Categories</InputLabel>

											<Select
												name="verticleCategories"
												value={this.props.verticleCategoriesValue}
												onChange={(e) => this.props.onFilterChangeHandle(e)}
											>

												{this.props.verticalCategoryList &&
													this.props.verticalCategoryList.length > 0
													?
													this.props.verticalCategoryList.map((res) => {
														return (
															<MenuItem key={res.id} value={res.id}>
																{res.name}
															</MenuItem>
														);
													}

													)
													: null}
											</Select>
										</FormControl>
									</div>
								) : null}
							<div className="filters">
								<FormControl fullWidth>
									<InputLabel shrink={true}>Sort</InputLabel>
									<Select
										name="sort"
										value={this.props.sortValue}
										onChange={(e) => this.props.onFilterChangeHandle(e)}
										labelId="demo-multiple-name-label"
										id="demo-multiple-name"
										multiple
										MenuProps={MenuProps}
									>
										<MenuItem value="created_at">Latest Item</MenuItem>
										<MenuItem value="price">By Price</MenuItem>
										<MenuItem value="popularity">By Popularity</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="filters">
								<FormControl fullWidth>
									<InputLabel>Sort Order</InputLabel>
									<Select
										name="sortOrder"
										value={this.props.sortOrderValue}
										onChange={(e) => this.props.onFilterChangeHandle(e)}

									>
										<MenuItem value="ASC">Ascending</MenuItem>
										<MenuItem value="DESC">Descending</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="filters">
								<FormControl fullWidth>
									<InputLabel>State</InputLabel>
									<Select
										name="state"
										value={this.props.stateValue}
										onChange={(e) => this.props.onFilterChangeHandle(e)}

									>
										{this.state.stateData && this.state.stateData.length > 0
											? this.state.stateData.map((res) => {
												return (
													<MenuItem key={res} value={res}>
														{res}
													</MenuItem>
												);
											})
											: null}
									</Select>
								</FormControl>
							</div>
							{this.props.stateValue ? (
								<div className="filters">
									<FormControl fullWidth>
										<InputLabel>District</InputLabel>
										<Select
											name="district"
											value={this.props.districtValue}
											onChange={(e) => this.props.onFilterChangeHandle(e)}
										>
											{this.props.districtList &&
												this.props.districtList.length > 0
												? this.props.districtList.map((res) => {
													return (
														<MenuItem key={res} value={res}>
															{res}
														</MenuItem>
													);
												})
												: null}
										</Select>
									</FormControl>
								</div>
							) : null}
							<div className="filterButtonContainer">
								<div className="filterButton">
									<Button
										fullWidth
										variant="outlined"
										color="primary"
										onClick={this.props.onFilterReset}
									>
										Reset Filters
									</Button>
								</div>
								<div className="filterButton">
									<Button
										fullWidth
										variant="outlined"
										color="primary"
										onClick={this.onFilterSubmit}
									>
										Apply Filters
									</Button>
								</div>
							</div>
						</div>
					</Drawer>
				</div>

				{this.state.productData && this.state.productData.data && !this.state.openProductList ? (


					<div className="productListing" >
						{this.props &&
							this.state.productData &&
							this.state.productData
							? this.state.prodData

							: "no data found"}

						<InfiniteScroll
							dataLength={this.state.dataList.length}
							hasMore={true || false}
							pageStart={0}
							next={this.state.openProductScroll ? this.handlePageClickFilter : this.handlePageClick}
							useWindow={false}
						/>

					</div>

				) : (
					<>
						<NoDataFound content="No Product Found" />
					</>
				)}

			</div>

		);
	}
}

export default Product;