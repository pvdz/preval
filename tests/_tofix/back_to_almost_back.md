# Preval test case

# back_to_almost_back.md

> Tofix > Back to almost back
>
> These are essentially back to back global checks. This can fold up to $(20)

## Input

`````js filename=intro
if ($) {
  $(20);
  let n = undefined;
  if ($) {
   let x = 5;
    if ($) {
      x = 10;
    } else {
    }
    if ($) {
      n = 20;
    } else {
      n = x;
    }
  } else {
  }
  $(n);
} else {
}
`````

## Pre Normal


`````js filename=intro
if ($) {
  $(20);
  let n = undefined;
  if ($) {
    let x = 5;
    if ($) {
      x = 10;
    } else {
    }
    if ($) {
      n = 20;
    } else {
      n = x;
    }
  } else {
  }
  $(n);
} else {
}
`````

## Normalized


`````js filename=intro
if ($) {
  $(20);
  let n = undefined;
  if ($) {
    let x = 5;
    if ($) {
      x = 10;
    } else {
    }
    if ($) {
      n = 20;
    } else {
      n = x;
    }
  } else {
  }
  $(n);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  $(20);
  let n = undefined;
  if ($) {
    let x /*:number*/ = 5;
    if ($) {
      x = 10;
    } else {
    }
    if ($) {
      n = 20;
    } else {
      n = x;
    }
  } else {
  }
  $(n);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 20 );
  let a = undefined;
  if ($) {
    let b = 5;
    if ($) {
      b = 10;
    }
    if ($) {
      a = 20;
    }
    else {
      a = b;
    }
  }
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
