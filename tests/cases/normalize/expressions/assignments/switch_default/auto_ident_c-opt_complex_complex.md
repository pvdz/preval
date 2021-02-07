# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(b)?.[$("x")];
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
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
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
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
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
 - 3: 'x'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - 3: 'x'
 - 4: undefined
 - eval returned: undefined
