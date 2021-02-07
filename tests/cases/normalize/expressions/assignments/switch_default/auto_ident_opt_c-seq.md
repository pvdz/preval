# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > switch_default > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, $(b))?.x;
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    a = undefined;
    1;
    2;
    const tmpChainRootProp = $(b);
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      a = tmpChainElementObject;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
({ x: 1 });
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    a = undefined;
    1;
    2;
    const tmpChainRootProp = $(b);
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      a = tmpChainElementObject;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined
