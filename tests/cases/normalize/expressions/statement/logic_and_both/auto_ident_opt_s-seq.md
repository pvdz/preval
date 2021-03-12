# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)?.x && (1, 2, b)?.x;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, b)?.x && (1, 2, b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$2 = tmpChainRootProp$1 != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = b.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpIfTest$2 = b != null;
  if (tmpIfTest$2) {
    b.x;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
