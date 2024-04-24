# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond c-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, $(30)) ? $(2) : $($(100));
    $(a);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = (10, 20, $(30)) ? $(2) : $($(100));
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
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    a = $(2);
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
let a = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
  $(a);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
  $( a );
}
else {
  const c = $( 100 );
  a = $( c );
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
