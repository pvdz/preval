# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] && [$(1), 2, $(3)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] && [$(1), 2, $(3)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpIfTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
if (tmpIfTest) {
  $(1);
  $(3);
} else {
}
$(a);
`````

## Output


`````js filename=intro
$(1);
$(3);
$(1);
$(3);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 1 );
$( 3 );
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
