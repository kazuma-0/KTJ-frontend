import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchEvent from '../../api/fetch-event';
import EditorLayout from '../../components/EditorLayout';
import SupabaseContext from '../../context/SupabaseContext';

function EditEvent() {
  const param = useParams();
  const [loaded, setLoaded] = useState(false);
  const supabase = useContext(SupabaseContext);
  const [data, setData] = useState({});
  useEffect(() => {
    fetchEvent(supabase, param.id).then((event) => {
      setData(event);
      console.log(event);
    });
  }, []);
  return <EditorLayout markdown={data.markdown} css={data.css} />;
  // </div>
}

export default EditEvent;
