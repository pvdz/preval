# Preval test case

# redundant_label_for_of.md

> Normalize > Continue > Redundant label for of
>
> If a labeled break does the same thing without the label then the label should be dropped

#TODO

## Input

`````js filename=intro
let x = $(2);
exit: for (const key of $(new Set(['a', 'b']))) {
  $('key:', key);
  
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    continue exit;
  } else {
    x = $(4);
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(2);
exit: for (const key of $(new Set([`a`, `b`]))) {
  $(`key:`, key);
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    continue exit;
  } else {
    x = $(4);
  }
}
`````

## Normalized

`````js filename=intro
let x = $(2);
const tmpCallCallee = $;
const tmpNewCallee = Set;
const tmpCalleeParam$1 = [`a`, `b`];
const tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1);
const tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
let key = undefined;
for (key of tmpForOfDeclRhs) {
  $(`key:`, key);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
    continue;
  } else {
    x = $(4);
  }
}
`````

## Output

`````js filename=intro
let x = $(2);
const tmpCalleeParam$1 = [`a`, `b`];
const tmpCalleeParam = new Set(tmpCalleeParam$1);
const tmpForOfDeclRhs = $(tmpCalleeParam);
let key = undefined;
for (key of tmpForOfDeclRhs) {
  $(`key:`, key);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
  } else {
    x = $(4);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: {}
 - 3: 'key:', 'a'
 - 4: 1
 - 5: 3
 - 6: 'key:', 'b'
 - 7: 1
 - 8: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same