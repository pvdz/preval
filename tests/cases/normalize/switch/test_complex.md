# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch ($(1)) {

}
`````

## Normalized

`````js filename=intro
{
  const tmpSwitchTest = $(1);
  {
    let tmpFallthrough = false;
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  {
    var x = x;
  }
}
`````

## Output

`````js filename=intro
$(1);
`````
