# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    10;
    20;
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      40;
      50;
      a = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      a = tmpCallCallee(tmpCalleeParam);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    10;
    20;
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      40;
      50;
      a = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      a = tmpCallCallee(tmpCalleeParam);
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
