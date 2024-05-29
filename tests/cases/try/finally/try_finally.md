# Preval test case

# try_finally.md

> Try > Finally > Try finally
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
`````

## Normalized

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
`````

## Output

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
}
finally {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
