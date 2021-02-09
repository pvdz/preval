# Preval test case

# auto_ident_upd_ip_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_upd_ip_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = $($(b)).x++;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let tmpPostUpdArgObj;
  let tmpPostUpdArgVal;
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
        b = { x: 1 };
        tmpCallCallee = $;
        tmpCalleeParam = $(b);
        tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
        tmpPostUpdArgVal = tmpPostUpdArgObj.x;
        const tmpAssignMemLhsObj = tmpPostUpdArgObj;
        const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
        tmpAssignMemLhsObj.x = tmpAssignMemRhs;
        a = tmpPostUpdArgVal;
        $(a, b);
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
      b = { x: 1 };
      tmpCallCallee = $;
      tmpCalleeParam = $(b);
      tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
      tmpPostUpdArgVal = tmpPostUpdArgObj.x;
      const tmpAssignMemLhsObj = tmpPostUpdArgObj;
      const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
      a = tmpPostUpdArgVal;
      $(a, b);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
