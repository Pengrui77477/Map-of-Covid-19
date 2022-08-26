export interface ChinaTotal {
	suspect: number;
	showLocalConfirm: number;
	noInfectH5: number;
	deadAdd: number;
	mRiskTime: string;
	nowConfirm: number;
	confirm: number;
	importedCase: number;
	localConfirmH5: number;
	confirmAdd: number;
	mediumRiskAreaNum: number;
	mtime: string;
	dead: number;
	noInfect: number;
	showlocalinfeciton: number;
	local_acc_confirm: number;
	localWzzAdd: number;
	localConfirm: number;
	heal: number;
	nowSevere: number;
	nowLocalWzz: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
}

export interface ChinaAdd {
	dead: number;
	nowConfirm: number;
	noInfect: number;
	noInfectH5: number;
	confirm: number;
	heal: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
	localConfirm: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	heal: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localinfeciton: boolean;
	dead: boolean;
	confirm: boolean;
	suspect: boolean;
	localConfirm: boolean;
	all: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	confirm: number;
	showRate: boolean;
	wzz: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	adcode: string;
	dead: number;
	mediumRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	heal: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
}

export interface Total {
	confirm: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	dead: number;
	heal: number;
	showRate: boolean;
	mediumRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	mtime: string;
	adcode: string;
	nowConfirm: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
	wzz_add: number;
	local_confirm_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	heal: number;
	wzz: number;
	highRiskAreaNum: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	adcode: string;
	confirm: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	nowConfirm: number;
	dead: number;
	showRate: boolean;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
}

