
export class Node {

    Nodes_Actiu: boolean = false;
    Nodes_Categories: string = "";
    Nodes_Html: string = "";
    Nodes_idNodes: number = 0;
    Nodes_idPare: number = 0;
    Nodes_isActiva: boolean = false;
    Nodes_isCategoria: boolean = false;
    Nodes_isPhp: boolean = false;
    Nodes_Nivell: number = 0;
    Nodes_Ordre: number = 0;
    Nodes_idSite: number = 0;
    Nodes_TitolMenu: string = '';
    Nodes_Url: string = '';
    GenUrl = [];

    constructor() { }

    fromAjax(OA: Node = new Node()): Node {
        Object.assign(this, OA);
        this.GeneraUrl();
        return this;
    }

    GeneraUrl() {
        if (this.Nodes_Html.length > 0) {
            this.GenUrl = ['/pagina', this.Nodes_idNodes, encodeURI(this.Nodes_TitolMenu)];
        }
    }
}

export class MenuElement {

    Element: Node = new Node();
    SubElements: MenuElement[] = [];
    Nivell: number = 0;
    Obert: boolean = false;
    TeFills: boolean = false;

    constructor(TotsNodes?: Node[], Actual?: Node, Nivell?: number) {

        if (TotsNodes) {

            if (!Actual) { this.Element = new Node().fromAjax(); this.Nivell = 0; }
            else { this.Element = new Node().fromAjax(Actual); this.Nivell = Nivell + 1; }

            if (!this.Element.Nodes_idPare) this.Element.Nodes_idPare = 0;

            let NodesSubMenu = TotsNodes.filter(X => {
                return (X.Nodes_idPare == this.Element.Nodes_idNodes) || (this.Element.Nodes_idNodes == 0 && !X.Nodes_idPare)
            });
            NodesSubMenu.forEach(X => {
                this.SubElements.push(new MenuElement(TotsNodes, X, this.Nivell))
            });

            if (NodesSubMenu.length > 0) this.TeFills = true;
        }

    }

    fromAjax(OA: Node[]) {

    }
}

