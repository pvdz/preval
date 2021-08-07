# Preval test case

# while_let_regex.md

> While > While let regex
>
> A regex is always truthy

#TODO

## Input

`````js filename=intro
let x = /foo/; 
while (x) {
  $(x = /foo/);
}
`````

## Pre Normal

`````js filename=intro
let x = /foo/;
while (x) {
  $((x = /foo/));
}
`````

## Normalized

`````js filename=intro
let x = /foo/;
while (x) {
  const tmpCallCallee = $;
  x = /foo/;
  let tmpCalleeParam = x;
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
let x = /foo/;
while (true) {
  x = /foo/;
  $(x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - 5: {}
 - 6: {}
 - 7: {}
 - 8: {}
 - 9: {}
 - 10: {}
 - 11: {}
 - 12: {}
 - 13: {}
 - 14: {}
 - 15: {}
 - 16: {}
 - 17: {}
 - 18: {}
 - 19: {}
 - 20: {}
 - 21: {}
 - 22: {}
 - 23: {}
 - 24: {}
 - 25: {}
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
