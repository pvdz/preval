# Preval test case

# special_prefix.md

> Normalize > Identifier > Explicit shadow implicit > Special prefix
>
> Making sure a binding with my special prefix will still properly work

#TODO

## Input

`````js filename=intro
{
  const $implicit$foo = $(1);
  $($implicit$foo);
}

$($implicit$foo);
`````

## Pre Normal

`````js filename=intro
{
  const $implicit$foo$1 = $(1);
  $($implicit$foo$1);
}
$($implicit$foo);
`````

## Normalized

`````js filename=intro
const $implicit$foo$1 = $(1);
$($implicit$foo$1);
$($implicit$foo);
`````

## Output

`````js filename=intro
const $implicit$foo$1 = $(1);
$($implicit$foo$1);
$($implicit$foo);
`````

## Globals

BAD@! Found 1 implicit global bindings:

$implicit$foo

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
