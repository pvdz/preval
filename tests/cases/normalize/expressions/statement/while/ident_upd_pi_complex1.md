# Preval test case

# ident_upd_pi_complex1.md

> Normalize > Expressions > Statement > While > Ident upd pi complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {x: 5};
let t = true;
while (t) {
  let p = --b.x;
  t = p;
  $(100);
}
$(b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 5 };
let t = true;
while (t) {
  let p = --b.x;
  t = p;
  $(100);
}
$(b);
`````

## Normalized


`````js filename=intro
let b = { x: 5 };
let t = true;
while (true) {
  if (t) {
    const tmpBinLhs = b.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
    b.x = varInitAssignLhsComputedRhs;
    let p = varInitAssignLhsComputedRhs;
    t = p;
    $(100);
  } else {
    break;
  }
}
$(b);
`````

## Output


`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
const b = { x: 0 };
$(b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
const a = { x: 0 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
