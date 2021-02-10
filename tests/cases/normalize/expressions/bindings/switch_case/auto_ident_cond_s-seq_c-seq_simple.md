# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
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
          a = $(60);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
