# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_or_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || $($(2));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        tmpCallCallee = $;
        tmpCalleeParam = $(0);
        a = tmpCallCallee(tmpCalleeParam);
        if (a) {
        } else {
          const tmpCallCallee$1 = $;
          const tmpCalleeParam$1 = $(2);
          a = tmpCallCallee$1(tmpCalleeParam$1);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
