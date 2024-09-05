# Preval test case

# auto_ident_array_complex2.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident array complex2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
const obj = {};
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [ tmpArrElement, 2, tmpArrElement$3 ];
obj[a];
$(a);

`````

## Pre Normal


`````js filename=intro
const obj = {};
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
obj[a];
$(a);
`````

## Normalized


`````js filename=intro
const obj = {};
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
obj[a];
$(a);
`````

## Output


`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const obj = {};
const a = [tmpArrElement, 2, tmpArrElement$3];
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {};
const d = [ a, 2, b ];
c[ d ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
