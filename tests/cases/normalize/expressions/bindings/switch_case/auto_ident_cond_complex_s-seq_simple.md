# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_cond_complex_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? (40, 50, 60) : $($(100));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
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
        const tmpIfTest$1 = $(1);
        if (tmpIfTest$1) {
          40;
          50;
          a = 60;
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
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
