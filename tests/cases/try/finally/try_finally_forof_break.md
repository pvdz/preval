# Preval test case

# try_finally_forof_break.md

> Try > Finally > Try finally forof break
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
for (const x of ['a', 'b', 'c']) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Pre Normal

`````js filename=intro
for (const x of [`a`, `b`, `c`]) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Normalized

`````js filename=intro
const tmpForOfDeclRhs = [`a`, `b`, `c`];
let x = undefined;
for (x of tmpForOfDeclRhs) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [`a`, `b`, `c`];
for (x of tmpForOfDeclRhs) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ "a", "b", "c" ];
for (a of b) {
  try {
    $( a, 1 );
  }
finally {
    $( 2 );
    break;
  }
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
