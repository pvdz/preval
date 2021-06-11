# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = b?.x) && (a = b?.x));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = b?.x) && (a = b?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    tmpNestedComplexRhs = tmpChainElementObject$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1 };
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
