export class Filter {
    page: number = 1
    pageSize: number = 5
    brandId: number | null = null
    modelId: number | null = null
    priceMin: number | null = null
    priceMax: number | null = null
    yearMin: number | null = null
    yearMax: number | null = null
    kmMax: number | null = null
    kmMin: number | null = null
}