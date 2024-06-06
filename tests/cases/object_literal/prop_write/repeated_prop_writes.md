# Preval test case

# repeated_prop_writes.md

> Object literal > Prop write > Repeated prop writes
>
> When writing to the same obj property multiple times, inline them or remove dupes.

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
  if (b.x === 3) {
    break;
  }
} while ((b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
    if (b.x === 3) {
      break;
    }
  }
  if ((b.x = b.x = b.x = b.x = b.x = b.x = c)) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpBinLhs = b.x;
  const tmpIfTest = tmpBinLhs === 3;
  if (tmpIfTest) {
    break;
  } else {
    const varInitAssignLhsComputedRhs$9 = c;
    b.x = varInitAssignLhsComputedRhs$9;
    const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
    b.x = varInitAssignLhsComputedRhs$7;
    const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
    b.x = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
    b.x = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    b.x = varInitAssignLhsComputedRhs;
    const tmpIfTest$1 = varInitAssignLhsComputedRhs;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 3 };
const a = { a: 999, b: 1000 };
$(100);
$(100);
$(a, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 3 };
const b = {
a: 999,
b: 1000
;
$( 100 );
$( 100 );
$( b, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
