# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_and_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(1)) && 2;
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
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
        tmpCalleeParam = $(1);
        a = tmpCallCallee(tmpCalleeParam);
        if (a) {
          a = 2;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
