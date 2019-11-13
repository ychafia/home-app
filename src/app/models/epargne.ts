export class Epargne {
    id_epargne: number;
    date_epargne: string;
    montant_epargne: number;
    motif_epargne: string;
    public constructor(_id_epargne: number, _date_epargne: string, _montant_epargne: number, _motif_epargne: string) {
        this.id_epargne = _id_epargne;
        this.date_epargne = _date_epargne;
        this.montant_epargne = _montant_epargne;
        this.motif_epargne = _motif_epargne;
    }
}