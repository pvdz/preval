# Preval test case

# queue_order.md

> If update var > Queue order
>
> The queue order is relevant for the if-update-var tests. This test caught why.

#TODO

## Input

`````js filename=intro
const b = { x: 1 };
({ a: 999, b: 1000 });
let a = undefined;
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = b[`x`];
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = b[`x`];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Pre Normal

`````js filename=intro
const b = { x: 1 };
({ a: 999, b: 1000 });
let a = undefined;
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = b[`x`];
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = b[`x`];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Normalized

`````js filename=intro
const b = { x: 1 };
let a = undefined;
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = b.x;
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(1);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
