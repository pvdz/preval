# Preval test case

# decl_after.md

> Normalize > Dce > Break > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  break;
  
  let x = $('fail');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $(`fail too`);
  break;
  let x = $(`fail`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    x = $(`fail too`);
  } else {
  }
  break;
  let x = 0;
}
$(`after`);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    while (true) {
      throw `Preval: Cannot access \`x\` before initialization`;
    }
  } else {
  }
} else {
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
