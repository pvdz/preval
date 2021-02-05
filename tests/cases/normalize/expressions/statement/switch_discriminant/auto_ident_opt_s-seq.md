# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > statement > switch_discriminant > auto_ident_opt_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ((1, 2, b)?.x) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
1;
2;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpSwitchTest = tmpChainElementObject;
}
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpSwitchTest = tmpChainElementObject;
}
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
