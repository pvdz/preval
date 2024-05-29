# Preval test case

# try_finally_throw.md

> Try > Finally > Try finally throw
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  throw 'exit';
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
try {
  throw `exit`;
} finally {
  $(2);
}
`````

## Normalized

`````js filename=intro
try {
  throw `exit`;
} finally {
  $(2);
}
`````

## Output

`````js filename=intro
try {
  throw `exit`;
} finally {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  throw "exit";
}
finally {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ exit ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
