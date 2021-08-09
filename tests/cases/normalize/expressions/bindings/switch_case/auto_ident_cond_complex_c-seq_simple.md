# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond complex c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? (40, 50, $(60)) : $($(100));
    $(a);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = $(1) ? (40, 50, $(60)) : $($(100));
    $(a);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  const tmpClusterSSA_a = $(60);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam);
  $(tmpClusterSSA_a$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
