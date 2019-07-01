import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";
//import { RestDataSource } from "./rest.datasource";

@Injectable()
export class ProductRepository {
    private categories: string[] = [];

    private products: Product[] = [
        new Product(1, "Product 1", "Λογοτεχνία", "Έγκλημα και Τιμωρία", 15),
        new Product(2, "Product 2", "Μουσική", "Rock Εγκυκλοπαίδεισ", 22),
        new Product(3, "Product 3", "Κινηματογράφος", "Top 100 Cult Films", 9),
        new Product(4, "Product 4", "Πληροφορική", "Μάθετε τα Windows WP", 10),
        new Product(5, "Product 5", "Μαθηματικά", "Μιλάω στον Γιο μου για τα Μαθηματικά", 24),
        new Product(6, "Product 6", "Ιστορία", "Η Ελλάδα την εποχή του Όθωνα", 12),
        new Product(7, "Product 7", "Λογοτεχνία", "Μόμπυ Ντικ", 15),
        new Product(8, "Product 8", "Μαθηματικά", "Μαθηματικά Αινίγματα", 20),
        new Product(9, "Product 9", "Μουσική", "Progressive Rock", 18),
        new Product(10, "Product 10", "Πληροφορική", "HTML και CSS", 11),
        new Product(11, "Product 11", "Φιλοσοφία", "Αρχαίοι Φιλόσοφοι", 21),
        new Product(12, "Product 12", "Κόμικς", "Βίος και Πολιτεία του Σκρούτζ Μακ Ντακ", 8),
        new Product(13, "Product 13", "Ιστορία", "Α' Παγκόσμιος Πόλεμος", 16),
        new Product(14, "Product 14", "Κινηματογράφος", "Στάνλεϊ Κιούμπρικ", 25),
        new Product(15, "Product 15", "Γραφιστική", "Βασική Γραφιστική", 18),
    ];

    constructor(private dataSource: StaticDataSource) {
        // dataSource.getProducts().subscribe(data => {
        //     this.products = data;
        //     this.categories = data.map(p => p.category)
        //         .filter((c, index, array) => array.indexOf(c) == index).sort();
        // });

        this.categories = this.products.map(p => p.category)
            .filter((c, index, array) => array.indexOf(c) == index).sort();

        console.log(this.categories);

    }

    getProducts(category: string = null): Product[] {
        return this.products
            .filter(p => category == null || category == p.category);
    }

    getProduct(id: number): Product {
        return this.products.find(p => p.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }
    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.dataSource.saveProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products.
                        findIndex(p => p.id == product.id), 1, product);
                });
        }
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.
                findIndex(p => p.id == id), 1);
        })
    }

}
