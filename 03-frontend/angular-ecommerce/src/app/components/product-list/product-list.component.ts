import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {



  products: Product[] = [];
  //(enhance) component ProductListComponent để có khả năng đọc thông tin về tham số category id.
  currentCategoryId: number = 1;
  currentCategoryName: string = ""
  searchMode: boolean = false;
  previousCategoryId: number = 1;


  // new properties for pagination
  thePageNumber: number = 1
  thePageSize: number = 5
  theTotalElements: number = 0

  previousKeyword: string = ""

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  // when user change (select PageSize)
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize
    this.thePageNumber = 1
    this.listProducts();
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // if we have a different keyword than previous 
    // then set the thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    // now search for the products using keyword
    this.productService.searchProductsPaginate(
                                                this.thePageNumber - 1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult())
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products
      this.thePageNumber = data.page.number + 1
      this.thePageSize = data.page.size
      this.theTotalElements = data.page.totalElements
    }
  }


  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      // get the "id" param string. convert string toa number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // not category is available ... default to category id 1
      this.currentCategoryId = 1
      this.currentCategoryName = 'Books';
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1
    }

    this.previousCategoryId = this.currentCategoryId

    console.log(`currenCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)



    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        this.processResult());
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: Name: ${theProduct.name}, Price: ${theProduct.unitPrice}`)
    
    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct)
    this.cartService.addToCart(theCartItem)
    }
} 
