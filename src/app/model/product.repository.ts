import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";
//import { RestDataSource } from "./rest.datasource";

@Injectable()
export class ProductRepository {
    private categories: string[] = [];

    private products: Product[] = [
        new Product(1, "Έγκλημα και Τιμωρία", "Λογοτεχνία", "ΝΤΟΣΤΟΓΙΕΦΣΚΙ ΦΙΟΝΤΟΡ", "assets/eglima.jpg", 15),
        new Product(2, "Rock Εγκυκλοπαίδεια", "Μουσική", " ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/rock.jpg", 22),
        new Product(3, "100 Cult Films", "Κινηματογράφος", "ERNEST MATHIJS, XAVIER MENDIK", "assets/cult-films.jpg", 20.90),
        new Product(4, "Τα Ελληνικά Windows 98 για Πρωτάρηδες", "Πληροφορική-Υπολογιστές", "ANDY RATHBONE", "assets/windows-98.jpg", 10),
        new Product(5, "Μαθηματικά Πεντάλεπτα", "Επιστήμες-Τεχνολογία", "BEHRENDS EHRHARD", "assets/mathimatika-pentalepta.jpg", 24),
        new Product(6, "Product 6", "Ιστορία", "Η Ελλάδα την εποχή του Όθωνα", "img/bowie.jpg", 12),
        new Product(7, "Μόμπυ Ντικ", "Λογοτεχνία", "ΜΕΛΒΙΛ ΧΕΡΜΑΝ", "assets/moby.jpg", 15),
        new Product(8, "Μαθηματικά Αινίγματα", "Επιστήμες-Τεχνολογία", "Μαθηματικά Αινίγματα", "img/bowie.jpg", 20),
        new Product(9, "David Bowie – Αναζητώντας τον Starman", "Μουσική", "ΜΑΡΙΑ ΜΑΡΚΟΥΛΗ", "assets/bowie.jpg", 18),
        new Product(10, "HTML and CSS", "Πληροφορική-Υπολογιστές", "JON DUCKETT", "assets/html.jpg", 11),
        new Product(11, "Οι φιλόσοφοι του αρχαίου κόσμου", "Φιλοσοφία", "TREVOR CURNOW", "img/bowie.jpg", 21),
        new Product(12, "Ο Βίος και η Πολιτεία του Σκρούτζ Μακ Ντακ", "Κόμικς", "ΝΤΟΝ ΡΟΣΑ", "assets/vios-kai-politeia.jpg", 8),
        new Product(13, "Product 13", "Ιστορία", "Α' Παγκόσμιος Πόλεμος", "img/bowie.jpg", 16),
        new Product(14, "Product 14", "Κινηματογράφος", "Στάνλεϊ Κιούμπρικ", "img/bowie.jpg", 25),
        new Product(15, "Βασική γραφιστική υποδομή", "Γραφιστική-Design", "ΣΠΥΡΟΣ ΜΠΕΣΗΣ", "assets/grafistiki.jpg", 18),
        new Product(16, "Έγκλημα και Τιμωρία", "Λογοτεχνία", "ΝΤΟΣΤΟΓΙΕΦΣΚΙ ΦΙΟΝΤΟΡ", "assets/eglima.jpg", 15),
        new Product(17, "Rock Εγκυκλοπαίδεια", "Μουσική", " ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/rock.jpg", 22),
        new Product(18, "100 Cult Films", "Κινηματογράφος", "ERNEST MATHIJS, XAVIER MENDIK", "assets/cult-films.jpg", 20.90),
        new Product(19, "Έγκλημα και Τιμωρία", "Λογοτεχνία", "ΝΤΟΣΤΟΓΙΕΦΣΚΙ ΦΙΟΝΤΟΡ", "assets/eglima.jpg", 15),
        new Product(20, "Rock Εγκυκλοπαίδεια", "Μουσική", " ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/rock.jpg", 22),
        new Product(21, "100 Cult Films", "Κινηματογράφος", "ERNEST MATHIJS, XAVIER MENDIK", "assets/cult-films.jpg", 20.90),
        new Product(22, "Έγκλημα και Τιμωρία", "Λογοτεχνία", "ΝΤΟΣΤΟΓΙΕΦΣΚΙ ΦΙΟΝΤΟΡ", "assets/eglima.jpg", 15),
        new Product(23, "Rock Εγκυκλοπαίδεια", "Μουσική", " ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/rock.jpg", 22),
        new Product(24, "100 Cult Films", "Κινηματογράφος", "ERNEST MATHIJS, XAVIER MENDIK", "assets/cult-films.jpg", 20.90),
        new Product(25, "Έγκλημα και Τιμωρία", "Λογοτεχνία", "ΝΤΟΣΤΟΓΙΕΦΣΚΙ ΦΙΟΝΤΟΡ", "assets/eglima.jpg", 15),
        new Product(26, "Rock Εγκυκλοπαίδεια", "Μουσική", " ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/rock.jpg", 22),
        new Product(27, "100 Cult Films", "Κινηματογράφος", "ERNEST MATHIJS, XAVIER MENDIK", "assets/cult-films.jpg", 20.90),
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
