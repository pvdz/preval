# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > logic_and_left > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = b?.x?.y) && $(100));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same