# Preval test case

# dupe_label.md

> Labels > Dupe label
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: break foo;
foo: break foo;
foo: break foo;
`````

## Pre Normal

`````js filename=intro
foo: break foo;
foo$1: break foo$1;
foo$3: break foo$3;
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
foo$1: {
  break foo$1;
}
foo$3: {
  break foo$3;
}
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
