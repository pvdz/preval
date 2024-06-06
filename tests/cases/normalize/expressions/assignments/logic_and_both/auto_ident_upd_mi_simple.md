# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) && (a = --b));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = --b) && (a = --b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  b = b - 1;
  let tmpNestedComplexRhs$1 = b;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(0);
$(0, 0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( 0, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
