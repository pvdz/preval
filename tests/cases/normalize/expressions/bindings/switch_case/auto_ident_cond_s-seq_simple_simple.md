# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_cond_s-seq_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, 30) ? $(2) : $($(100));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
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
        a = undefined;
        const tmpIfTest$1 = 30;
        if (tmpIfTest$1) {
          a = $(2);
        } else {
          const tmpCallCallee = $;
          const tmpCalleeParam = $(100);
          a = tmpCallCallee(tmpCalleeParam);
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
    {
      a = undefined;
      const tmpIfTest$1 = 30;
      if (tmpIfTest$1) {
        a = $(2);
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        a = tmpCallCallee(tmpCalleeParam);
      }
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
