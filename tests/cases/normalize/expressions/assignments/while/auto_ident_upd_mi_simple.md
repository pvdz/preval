# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > While > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((a = --b)) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while ((a = --b)) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
$(0, 0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
