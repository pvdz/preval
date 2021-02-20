# Preval test case

# ident_c-opt_simple_simple1.md

> Normalize > Expressions > Assignments > Arr element > Ident c-opt simple simple1
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
$(a = b?.x);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let SSA_a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  SSA_a = tmpChainElementObject;
}
const tmpCalleeParam = SSA_a;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
