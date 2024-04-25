# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident array complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = [$(1), 2, $(3)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = [$(1), 2, $(3)];
$(a);
`````

## Normalized

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
$( c );
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
