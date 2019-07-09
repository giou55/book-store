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
        new Product(6, "Όσα δεν γνωρίζατε για τα χρόνια του Καποδίστρια, του Όθωνα και του Γεωργίου του Α΄", "Ιστορία", "ΣΥΛΛΟΓΙΚΟ ΕΡΓΟ", "assets/osa-den-gnorizate.jpg", 12),
        new Product(7, "Μόμπυ Ντικ", "Λογοτεχνία", "ΜΕΛΒΙΛ ΧΕΡΜΑΝ", "assets/moby.jpg", 15),
        new Product(8, "Η Κόμη της Βερενίκης", "Επιστήμες-Τεχνολογία", "ΓΙΩΡΓΟΣ ΓΡΑΜΜΑΤΙΚΑΚΗΣ", "assets/komi-tis-verenikis.jpg", 20),
        new Product(9, "David Bowie – Αναζητώντας τον Starman", "Μουσική", "ΜΑΡΙΑ ΜΑΡΚΟΥΛΗ", "assets/starman.jpg", 18),
        new Product(10, "HTML and CSS", "Πληροφορική-Υπολογιστές", "JON DUCKETT", "assets/html.jpg", 11),
        new Product(11, "Οι φιλόσοφοι του αρχαίου κόσμου", "Φιλοσοφία", "TREVOR CURNOW", "assets/filosofoi.jpg", 21),
        new Product(12, "Ο Βίος και η Πολιτεία του Σκρούτζ Μακ Ντακ", "Κόμικς", "ΝΤΟΝ ΡΟΣΑ", "assets/vios-kai-politeia.jpg", 8),
        new Product(13, "Μια σταγόνα ιστορία", "Ιστορία", "ΔΗΜΗΤΡΗΣ ΚΑΜΠΟΥΡΑΚΗΣ", "assets/mia-stagona-istoria.jpg", 16),
        new Product(14, "The Stanley Kubrick Archives", "Κινηματογράφος", "ALISON CASTLE", "assets/kubrick.jpg", 25),
        new Product(15, "Βασική γραφιστική υποδομή", "Γραφιστική-Design", "ΣΠΥΡΟΣ ΜΠΕΣΗΣ", "assets/grafistiki.jpg", 18),
        new Product(16, "Elements of graphic design", "Γραφιστική-Design", "RICK JOHNSON", "assets/elements.jpg", 15),
        new Product(17, "Σολάρις", "Λογοτεχνία", "ΣΤΑΝΙΣΛΑΒ ΛΕΜ", "assets/solaris.jpg", 15),
        new Product(18, "1001 Albums You Must Hear Before You Die", "Μουσική", "ROBERT DIMERY", "assets/1001-albums.jpg", 22),
        new Product(19, "Κυνηγώντας το μεγάλο ψάρι", "Κινηματογράφος", "DAVID LYNCH", "assets/megalo-psari.jpg", 22),
        new Product(20, "Τα ελληνικά Comics", "Κόμικς", "SOLOUP", "assets/comics.jpg", 20.90)
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
