# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_and_and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(1)) && $($(1)) && $($(2));
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
      ('case 0:');
      {
        tmpCallCallee = $;
        tmpCalleeParam = $(1);
        a = tmpCallCallee(tmpCalleeParam);
        if (a) {
          const tmpCallCallee$1 = $;
          const tmpCalleeParam$1 = $(1);
          a = tmpCallCallee$1(tmpCalleeParam$1);
        }
        if (a) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          a = tmpCallCallee$2(tmpCalleeParam$2);
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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      tmpCallCallee = $;
      tmpCalleeParam = $(1);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        a = tmpCallCallee$1(tmpCalleeParam$1);
      }
      if (a) {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        a = tmpCallCallee$2(tmpCalleeParam$2);
      }
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
