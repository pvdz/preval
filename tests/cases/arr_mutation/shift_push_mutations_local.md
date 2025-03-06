# Preval test case

# shift_push_mutations_local.md

> Arr mutation > Shift push mutations local
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) { // Unrelated to loop unrolling so let's skip that
  const arr = [1, 2, 3, 4];
  const test = $('never');
  if (test) {
    $(arr);
    break;
  } else {
    const tmp = arr.shift();  // This statement should be inlined (arr was created inside the loop)
    arr.push(tmp);            // This statement should be inlined (arr was created inside the loop)
    $(arr.slice(0));          // Don't let arr escape
  }
}
$('exit');
`````

## Pre Normal


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const arr = [1, 2, 3, 4];
  const test = $(`never`);
  if (test) {
    $(arr);
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
    $(arr.slice(0));
  }
}
$(`exit`);
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const arr = [1, 2, 3, 4];
  const test = $(`never`);
  if (test) {
    $(arr);
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
    const tmpCalleeParam = arr.slice(0);
    $(tmpCalleeParam);
  }
}
$(`exit`);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const test /*:unknown*/ = $(`never`);
  const arr /*:array*/ = [1, 2, 3, 4];
  if (test) {
    $(arr);
    break;
  } else {
    const tmp /*:unknown*/ = arr.shift();
    arr.push(tmp);
    const tmpCalleeParam /*:array*/ = arr.slice(0);
    $(tmpCalleeParam);
  }
}
$(`exit`);
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( "never" );
  const b = [ 1, 2, 3, 4 ];
  if (a) {
    $( b );
    break;
  }
  else {
    const c = b.shift();
    b.push( c );
    const d = b.slice( 0 );
    $( d );
  }
}
$( "exit" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'never'
 - 2: [1, 2, 3, 4]
 - 3: 'exit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_push
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice