# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) && b?.["x"];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(100) && b?.['x'];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = 'x';
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(100);
if (tmpIfTest) {
  const b = { x: 1 };
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    b.x;
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
