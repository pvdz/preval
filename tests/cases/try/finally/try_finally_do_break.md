# Preval test case

# try_finally_do_break.md

> Try > Finally > Try finally do break
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
do {
  try {
    $(1);
  } finally {
    $(2);
    break;
  }
} while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE)
$(3);
`````

## Pre Normal

`````js filename=intro
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      try {
        $(1);
      } finally {
        $(2);
        break;
      }
    }
    tmpDoWhileFlag = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
  }
}
$(3);
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    try {
      $(1);
    } finally {
      $(2);
      break;
    }
    tmpDoWhileFlag = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
  } else {
    break;
  }
}
$(3);
`````

## Output

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
$(3);
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
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
