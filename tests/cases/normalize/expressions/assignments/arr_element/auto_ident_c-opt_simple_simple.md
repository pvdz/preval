# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_c-opt_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = b?.["x"]) + (a = b?.["x"]));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainRootComputed$1 = 'x';
  const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
  a = tmpChainElementObject$1;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp['x'];
  a = tmpChainElementObject;
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1['x'];
  a = tmpChainElementObject$1;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same