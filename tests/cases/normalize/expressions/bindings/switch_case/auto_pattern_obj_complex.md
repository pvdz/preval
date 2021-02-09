# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > bindings > switch_case > auto_pattern_obj_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let { a } = $({ a: 1, b: 2 });
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let bindingPatternObjRoot;
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        tmpCallCallee = $;
        tmpCalleeParam = { a: 1, b: 2 };
        bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
        a = bindingPatternObjRoot.a;
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    {
      tmpCallCallee = $;
      tmpCalleeParam = { a: 1, b: 2 };
      bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
      a = bindingPatternObjRoot.a;
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
