# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) || (a = [$(1), 2, $(3)]));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) || (a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpArrElement$5 = $(1);
  const tmpArrElement$7 = 2;
  const tmpArrElement$9 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
let a = [tmpArrElement, 2, tmpArrElement$3];
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpArrElement$5 = $(1);
  const tmpArrElement$9 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$5, 2, tmpArrElement$9];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
let c = [ a, 2, b ];
const d = c;
if (c) {
  $( d );
}
else {
  const e = $( 1 );
  const f = $( 3 );
  const g = [ e, 2, f ];
  c = g;
  $( g );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
