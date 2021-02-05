# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = (1, 2, b)?.x;
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        b = { x: 1 };
        a = undefined;
        1;
        2;
        const tmpChainRootProp = b;
        if (tmpChainRootProp) {
          const tmpChainElementObject = tmpChainRootProp.x;
          a = tmpChainElementObject;
        }
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let b;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  b = { x: 1 };
  a = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  }
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
