# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) || (a = (1, 2, $(b))?.x));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) || (a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    tmpNestedComplexRhs = tmpChainElementObject$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
if (a) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$1 = tmpChainRootProp$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
