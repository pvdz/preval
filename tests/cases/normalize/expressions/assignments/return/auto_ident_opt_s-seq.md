# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > assignments > return > auto_ident_opt_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b)?.x);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs = undefined;
  1;
  2;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpNestedComplexRhs = tmpChainElementObject;
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { x: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpNestedComplexRhs = tmpChainElementObject;
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
